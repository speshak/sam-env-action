# SAM Env Action

_A poorly named GitHub action to do a very specific thing for me._

I have several AWS SAM projects which I deploy using GitHub Actions. I've
slowly evolved a convention where the deployed stack name is determined by the
branch name.  This action standardizes that behavior across my projects and removes duplicate logic from my workflows.  


## Usage

Include the action in the workflow steps:

```
- uses: speshak/sam-env-action@v1
  id: sam-env-action
  with:
    base-name: MyBaseName
```

Future steps can use the generated values:

```
<snip>
--stack-name ${{ steps.sam-env-action.outputs.stack-name }}
```


## Outputs

The action produces two outputs:

- `stack-name` - The name of the deployed CloudFormation stack. For production (`main`) this is the base stack name. All other environments get the env name appended to the base name.
- `env` - The environment name. By convention this is used as the value for the `Environment` tag during deployments.
