import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Получаем путь к текущей директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Создаем директорию public, если её нет
const publicDir = join(__dirname, '../public');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir);
}

// Исходный SVG файл
const inputFile = join(__dirname, '../public/logo.svg');

// Конфигурация иконок
const icons = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

// Функция для создания иконки
async function generateIcon(size, outputName) {
  try {
    await sharp(inputFile)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, outputName));

    console.log(`✓ Создана иконка ${outputName}`);
  } catch (error) {
    console.error(`✗ Ошибка при создании ${outputName}:`, error);
  }
}

// Создание favicon.ico (включает несколько размеров)
async function generateFavicon() {
  try {
    const sizes = [16, 32];
    const buffers = await Promise.all(
      sizes.map((size) =>
        sharp(inputFile).resize(size, size).toFormat('png').toBuffer()
      )
    );

    await sharp(buffers[0])
      .toFormat('ico')
      .toFile(join(publicDir, 'favicon.ico'));

    console.log('✓ Создан favicon.ico');
  } catch (error) {
    console.error('✗ Ошибка при создании favicon.ico:', error);
  }
}

// Генерация всех иконок
async function generateAllIcons() {
  console.log('Начинаем генерацию иконок...');

  // Генерируем все PNG иконки
  await Promise.all(icons.map((icon) => generateIcon(icon.size, icon.name)));

  // Генерируем favicon.ico
  await generateFavicon();

  console.log('Генерация иконок завершена!');
}

generateAllIcons();
