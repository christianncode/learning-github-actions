import * as github from "@actions/github";

async function run() {
  const context = github.context;
  const pullRequest = context.payload.pull_request;

  if (
    !pullRequest ||
    !pullRequest.additions ||
    !pullRequest.deletions ||
    !pullRequest.number
  ) {
    console.error("Invalid pull request payload.");
    process.exit(1);
  }

  const additions = pullRequest.additions;
  const deletions = pullRequest.deletions;
  const totalChanges = additions + deletions;

  const commentBody = `
  ### 📊 Code Changes Summary
  | Lines Added | Lines Removed | Total Changes |
  |-------------|---------------|---------------|
  | ${additions} | ${deletions} | ${totalChanges} |

  ${
    totalChanges > 500
      ? "❌ **Too many changes! The PR exceeds the limit of 500 lines.**"
      : "✅ **The PR is within the acceptable limit.**"
  }
  `;

  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: pullRequest.number,
    body: commentBody,
  });
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
