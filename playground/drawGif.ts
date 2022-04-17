import { performance } from 'perf_hooks';
import Gif from '../src';
import fs from 'fs';
import path from 'path';

const startTime = performance.now();

async function doStuff() {
	const rubiksCube = await Gif.fromPath(
		path.resolve(__dirname, 'input2.gif'),
		{
			coalesce: false, // whether the gif should be coalesced first, default: true
			repeat: 'forever', // how many times the GIF should repeat, default: 'forever'
			fps: 30, // the amount of frames to render per second, default: source gif frame count!,
			verbose: true, // whether it should log about its rendering process, default: false
		}
	);

	const catCube = await Gif.fromPath(path.resolve(__dirname, 'input.gif'));
	const taiga = await Gif.fromPath(path.resolve(__dirname, 'taiga.gif'));

	await rubiksCube.drawGif(catCube, 0, 0, {
		width: 150,
		height: 150,
		border: true,
	});

	await rubiksCube.drawGif(taiga, 150, 100, {
		width: 150,
		height: 150,
		round: true,
		border: true,
	});

	await rubiksCube.drawGif(taiga, 150, 300, {
		width: 150,
		height: 150,
		round: true,
		fps: taiga.fps / 2,
	});

	const result = await rubiksCube.render();
	const endTime = performance.now();
	console.log(`Finished in ${endTime - startTime}ms!`);

	fs.writeFileSync(path.resolve(__dirname, 'drawGif.gif'), result);
}

doStuff();
