[code review guide](https://github.com/zoeknow/funnow.web.nuxt/wiki/Code-Review-Guide)
## Objective

- [ZOEKIT-{TicketNo}](https://zoeknow.atlassian.net/browse/ZOEKIT-{TicketNo})
- figma link
- Enter the subject of the PR

## Description (Goals)

For assisting reviewers to better understand the purpose of PR, please describe as much as possible the purpose, practice, or requirements.

You can provide example, reproduce step, flow chart, test data for reference, or scope of influence.

## Root Cause
> Delete this heading if this is not a bug.

Please specify the cause of the problem.

## Solution
> Delete this heading if this is not a bug.

Please describe the solution of the problem.

## Screenshots

Upload the screenshots of each steps from this feature or bugfix. Please copy and paste the image url inside the paragraph html template.

You can edit this html template:

<p>
<img src='https://user-images.githubusercontent.com/3387462/123956375-38455600-d9dd-11eb-9cd2-07dc8d26083a.png' width='150'/>
<img src='https://user-images.githubusercontent.com/3387462/124079089-48137780-da7b-11eb-934b-4f5e82bb8f07.png' width='150'/>
</p>

> Duplicate `<img>` as multiple screenshots uploaded.

## Test Cases

Please provide any links/products/branches/orders/members...etc. for reviewer to test this PR, such as:

- https://funnowstg.page.link/n2xjFJoXNre8AhF17 for sending gift.
- https://www.myfunnow.com/products/3109372402976 for dynamic link redirecting to product detail.

or

Provide the steps/flows or scenarios, such as:

1. Create a new account
2. Skip region selection
3. Deny the location permission

## Checklist

Please make sure to complete the following checklist before merge or remove [WIP]
- [ ] Unit tests (explain in Description if any reasons why it is difficult to write tests, such as adjusting payment API)
- [ ] Manual test on local or dev 
- [ ] Self review
- [ ] Other things need to check (e.g. i18n / confirm with BE / etc.)
