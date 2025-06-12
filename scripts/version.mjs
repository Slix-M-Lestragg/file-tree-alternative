import fs from 'fs/promises';
import path from 'path';

const updateVersion = async (newVersion) => {
    if (!newVersion) {
        console.error('Please provide a version number');
        process.exit(1);
    }

    const rootDir = new URL('..', import.meta.url).pathname;
    
    // Update manifest.json
    const manifestPath = path.join(rootDir, 'manifest.json');
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    manifest.version = newVersion;
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 4));

    // Update package.json
    const packagePath = path.join(rootDir, 'package.json');
    const pkg = JSON.parse(await fs.readFile(packagePath, 'utf8'));
    pkg.version = newVersion;
    await fs.writeFile(packagePath, JSON.stringify(pkg, null, 4));

    // Update versions.json
    const versionsPath = path.join(rootDir, 'versions.json');
    const versions = JSON.parse(await fs.readFile(versionsPath, 'utf8'));
    versions[newVersion] = manifest.minAppVersion;
    await fs.writeFile(versionsPath, JSON.stringify(versions, null, 4));

    // Update Releases.md
    const releasesPath = path.join(rootDir, 'Releases.md');
    const releaseDate = new Date().toISOString().split('T')[0];
    const releaseContent = await fs.readFile(releasesPath, 'utf8');
    
    const newReleaseHeader = `\n## Version ${newVersion}\n\n`;
    const updatedContent = releaseContent.replace('# Release Updates\n', '# Release Updates\n' + newReleaseHeader);
    
    await fs.writeFile(releasesPath, updatedContent);

    console.log(`✨ Updated version to ${newVersion} in all files`);
};

updateVersion(process.argv[2]);
