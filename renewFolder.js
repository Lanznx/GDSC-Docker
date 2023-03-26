// const fs = require('fs');

// const files = fs.readdirSync("./");

// const matrixInclude = files
//   .filter((file) => fs.statSync(file).isDirectory())
//   .map((folder) => { folder: folder });

// const workflowYamlFile = fs.readFileSync("./.github/workflows/api-test.yaml", "utf8");
// const updatedWorkflowYamlFile = workflowYamlFile.replace(
//   /(matrix:\n\s+include:\n\s+-\s+folder:\s+\w+\n\s+)/,
//   `$1${matrixInclude.map(i => `- folder: ${i.folder}\n`).join('')}`,
// );

// fs.writeFileSync("./.github/workflows/api-test.yaml", updatedWorkflowYamlFile);

const fs = require('fs');

// Get the file list of the PR
const files = fs.readdirSync('./');

// Build the include list for the matrix
const matrixInclude = files
  .filter(file => fs.statSync(file).isDirectory())
  .map(file => ({ folder: file }));

// Update the matrix include list in the workflow YAML file
const workflowYamlFile = fs.readFileSync('.github/workflows/api-test.yaml', 'utf8');
const newFolders = matrixInclude
  .map(i => `${i.folder}`)
  .filter(i => i != '.git' && i != '.github')

const updatedWorkflowYamlFile = workflowYamlFile.replace(
  /matrix:(\s|\n)+directory:\s+\[.*?\]/,
  `matrix:\n          directory: [${newFolders.join(', ')}]`,
);


fs.writeFileSync("./.github/workflows/api-test.yaml", updatedWorkflowYamlFile);
