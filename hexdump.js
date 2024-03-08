const fs = require('fs');
const readline = require('readline');

function hexdump(filepath) {
	try {
		const buffer = fs.readFileSync(filepath);
		const bytesPerLine = 16;
		const bufferLength = buffer.length;
		let output = '';

		for (let i = 0; i < buffer.length; i += bytesPerLine) {
			let hex = '';
			let ascii = '';

		for (let j = i; j < Math.min(i + bytesPerLine, bufferLength); j++) {
			hex += buffer[j].toString(16).padStart(2, '0') + ' ';
			ascii += buffer[j] >= 32 && buffer[j] <= 126 ? String.fromCharCode(buffer[j]) : '.';
		}
		output += hex.padEnd(bytesPerLine * 3) + ' | ' + ascii + '\n';
	}
	console.log(output);
} catch (error) {
	console.error("Error reading file: ", error);
}

}

function promptForFilePath() {
	const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
	});
	rl.question("enter path: ", (filepath)=> {
	rl.close();
	hexdump(filepath);
	});
}

if (process.argv[2]){ 
	hexdump(process.argv[2]);
} else {
	promptForFilePath();
}
