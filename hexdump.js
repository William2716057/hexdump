const fs = require('fs');
const readline = require('readline');

function hexdump(filepath) {
	try {
		const buffer = fs.readFileSync(filepath);
		const bytesPerLine = 16; //for displaying 16 bytes per line
		const bufferLength = buffer.length; //length of the buffer
		let output = '';
		//loop through buffer and generate hexdump
		for (let i = 0; i < buffer.length; i += bytesPerLine) {
			let hex = ''; //variable to store hex representation
			let ascii = ''; //variable to store ascii representation
		//loopo through current line and generate hex and ascii representations 
		for (let j = i; j < Math.min(i + bytesPerLine, bufferLength); j++) {
			hex += buffer[j].toString(16).padStart(2, '0') + ' '; //convert hex and pad with zeros 
			ascii += buffer[j] >= 32 && buffer[j] <= 126 ? String.fromCharCode(buffer[j]) : '.'; //convert  byte to ascii character replace non printables with '.' 
		}
		output += hex.padEnd(bytesPerLine * 3) + ' | ' + ascii + '\n'; //concatenate hex and ascii for current line
	}
	console.log(output); //output hexdump
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
