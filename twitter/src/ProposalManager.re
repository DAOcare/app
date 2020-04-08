type proposalsManager = {
  currentProposals: string,
  proposalEmojiLookup: string,
  getCurrentProposals: (. unit) => Js.Promise.t(unit),
  getProjectIdFromEmoji: (. unit) => option(int),
};

[@bs.module "./proposalManager"]
external setupProposalManager: (. unit) => proposalsManager =
  "setupProposalManager";
