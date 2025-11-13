// generateBlogManifest.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogsDir = path.join(__dirname, 'public', 'blogs');
const outputPath = path.join(__dirname, 'src', 'data', 'blogs.json');

const files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.md'));

const manifest = files.map(filename => {
  const filePath = path.join(blogsDir, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    id: path.basename(filename, '.md'),
    title: data.title || 'Untitled',
    date: data.date || 'Unknown',
    tags: data.tags || [],
    path: `blogs/${filename}`,
    teaser: content.trim().split('\n')[0], // first line of content
    body: content.trim() // full markdown content
  };
});

fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
console.log(`✅ Blog manifest generated with ${manifest.length} entries including Markdown content.`);
