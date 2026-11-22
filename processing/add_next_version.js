const fs = require("fs");
const glob = require("glob");

// Kasm release to add, e.g. '1.21'. Images are expected to publish a '<baseversion>.0-rolling' tag.
const baseversion = '1.20'

const version = baseversion + '.x'
const tagversion = baseversion + '.0-rolling'

glob("../workspaces/**/workspace.json", async function (err, files) {
	if (err) {
		console.log(
			"cannot read the folder, something goes wrong with glob",
			err
		);
	}


	for (const file of files) {

		let filedata = fs.readFileSync(file);
		let parsed = JSON.parse(filedata);

		const current = parsed.compatibility[parsed.compatibility.length - 1]
		const image = current.image.split(':')[0]

		const exists = parsed.compatibility.findIndex(el => el.version === version)

		// Never list 'latest' here: it stays on the 1.19-compatible image and newer
		// Kasm releases refuse to launch images built for older releases.
		let details = {
			version,
			image: image + ':' + tagversion,
			uncompressed_size_mb: current.uncompressed_size_mb || 0,
			available_tags: [
				tagversion
			]
		}

		if (exists === -1) {
			parsed.compatibility.push(details)
			fs.writeFileSync(file, JSON.stringify(parsed, null, 2));
		}
	}


});
