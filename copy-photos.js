import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'Photos');
const targetDir = path.join(__dirname, 'public', 'photos');
const jsonOutputDir = path.join(__dirname, 'src', 'data');
const jsonOutputFile = path.join(jsonOutputDir, 'gallery.json');

// Mapping folder names to clean display names
const CATEGORY_NAMES = {
  'Activitiies': 'Activities',
  'Common Photos': 'Common Views',
  'Deluxe Bedroom': 'Deluxe Bedroom',
  'Family Room': 'Family Room',
  'Family Suite Room': 'Family Suite Room',
  'One Bedroom Cottage': 'One Bedroom Cottage',
  'Triple Bedded room': 'Triple Bedded Room',
  'Two Bedrooms with Living room Individual Cottage': 'Two Bedrooms Cottage'
};

function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    ensureDirExists(dest);
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function getFileType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (['.mp4', '.webm', '.ogg', '.mov'].includes(ext)) {
    return 'video';
  }
  return 'image';
}

function generateGalleryData() {
  console.log('Starting copying photos and generating JSON metadata...');
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  ensureDirExists(targetDir);
  ensureDirExists(jsonOutputDir);

  const categories = [];
  const folders = fs.readdirSync(sourceDir);

  folders.forEach((folder) => {
    const folderPath = path.join(sourceDir, folder);
    const stats = fs.statSync(folderPath);

    if (stats.isDirectory()) {
      console.log(`Processing folder: ${folder}`);
      
      // Copy folder to public/photos/
      const destFolderPath = path.join(targetDir, folder);
      copyRecursiveSync(folderPath, destFolderPath);

      const files = fs.readdirSync(folderPath);
      const items = [];

      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isFile()) {
          // Check if it is an image or video
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.mov'].includes(ext)) {
            // Web accessible path
            const webPath = `/photos/${folder}/${file}`;
            items.push({
              src: webPath,
              type: getFileType(file),
              fileName: file
            });
          }
        }
      });

      if (items.length > 0) {
        categories.push({
          key: folder.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          folderName: folder,
          displayName: CATEGORY_NAMES[folder] || folder,
          items: items
        });
      }
    }
  });

  // Write JSON data
  fs.writeFileSync(jsonOutputFile, JSON.stringify(categories, null, 2), 'utf-8');
  console.log(`Successfully generated gallery JSON data at: ${jsonOutputFile}`);
  console.log(`Total categories processed: ${categories.length}`);
}

generateGalleryData();
