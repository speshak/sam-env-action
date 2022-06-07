/**
 * Take the github.event.ref value and produce a stack & env name to be used by
 * later steps.
 */
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `base-name` input defined in action metadata file
  const baseName = core.getInput('base-name');
  console.log(`Ref: ${github.context.payload.ref}`)

  if (github.context.payload.ref == 'refs/heads/main') {
    console.log("Production branch");
    console.log("env=Prod");
    console.log(`stack-name=${baseName}`);

    core.setOutput("env", 'Prod');
    core.setOutput("stack-name", baseName);
  }
  else {
    console.log("Non-prod branch")
    // Pull the last component off the ref
    const parts = github.context.payload.ref.split('/')
    const env = parts[parts.length - 1]

    console.log(`env=${env}`);
    console.log(`stack-name=${baseName}-${env}`);

    core.setOutput("env", env);
    core.setOutput("stack-name", `${baseName}-${env}`);
  }

} catch (error) {
  core.setFailed(error.message);
}
