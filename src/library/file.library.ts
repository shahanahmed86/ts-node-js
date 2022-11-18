import fs from 'fs';
import path from 'path';
import { convertUnknownIntoError, getUniqueId } from '../utils/logics.utils';
import { NotFound } from '../utils/errors.utils';
import { IFileArray } from '../types/extends.types';

class File {
	path = './uploads';

	get uuid(): string {
		return getUniqueId();
	}

	async localUpload(image: IFileArray): Promise<string> {
		const imageFile = image.uploadedFile;
		const filename = `${this.uuid}-${imageFile.name}`;

		if (!fs.existsSync(this.path)) fs.mkdirSync(this.path);
		if (!fs.existsSync(`${this.path}/temp`)) fs.mkdirSync(`${this.path}/temp`);

		return new Promise((resolve, reject) => {
			const uploadFile = path.join(this.path, 'temp', filename);
			imageFile
				.mv(uploadFile) // Use the mv() method to place the file somewhere
				.then(() => resolve(`temp/${filename}`))
				.catch(reject);
		});
	}

	deleteOldFileLocally(imagePath: string): boolean {
		const path = `${this.path}/${imagePath}`;
		if (!fs.existsSync(path)) return false;

		fs.unlinkSync(path);
		return true;
	}

	getFilePath(imagePath: string): string {
		const path = `${this.path}/${imagePath}`;
		if (fs.existsSync(path)) return path;

		return './src/assets/404-image.png';
	}

	moveImageFromTmp(imagePath: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const currentPath = path.join(this.path, imagePath);
			if (!fs.existsSync(currentPath)) reject(new NotFound('Image not found'));
			else {
				const newFile = imagePath.split('/')[1];
				const destPath = path.join(this.path, newFile);

				fs.rename(currentPath, destPath, (e) => {
					if (e) {
						const error = convertUnknownIntoError(e);
						if (error) reject(error);
					}

					resolve(newFile);
				});
			}
		});
	}
}

export default new File();
