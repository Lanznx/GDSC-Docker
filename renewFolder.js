
const fs = require('fs');

// Get the file list of the PR
const files = fs.readdirSync(process.env.GITHUB_WORKSPACE + '/');

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
