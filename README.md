# @itwin/codemods

Instructions:
1. Install jscodeshift
> `npm install -g jscodeshift`

2. Clone this repo as a peer to your repo (WIP, once codemods are published transforms can be passed in as a URL making this step unnecessary)

3. In the root of your repo, run codemod with:
> `jscodeshift -t ../codemods/transforms/itwin-codemods.ts --extension=ts --parser=ts ./src/**/*.ts`
