import * as github from "@actions/github";

async function run() {
  const context = github.context;
  const additions = context.payload.pull_request.additions;
  const deletions = context.payload.pull_request.deletions;
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
    issue_number: context.payload.pull_request.number,
    body: commentBody,
  });
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
