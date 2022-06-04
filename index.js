/**
 * Take the github.event.ref value and produce a stack & env name to be used by
 * later steps.
 */
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `base-name` input defined in action metadata file
  const baseName = core.getInput('base-name');
  const context = github.context;

  if (context.ref == 'refs/heads/main') {
    core.setOutput("env", 'Prod');
    core.setOutput("stack-name", baseName);
  }
  else {
    // Pull the last component off the ref
    const parts = context.ref.split('/')
    const env = parts[parts.length() - 1]

    core.setOutput("env", env);
    core.setOutput("stack-name", `${baseName}-${env}`);
  }

} catch (error) {
  core.setFailed(error.message);
}
