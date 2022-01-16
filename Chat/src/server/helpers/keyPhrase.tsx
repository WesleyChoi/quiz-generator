// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var azureapi = require('../../public-keys/azure-api');
const { TextAnalyticsClient, AzureKeyCredential } = require('@azure/ai-text-analytics');

module.exports = async function keyPhraseExtraction(input) {
  const client = new TextAnalyticsClient(
    azureapi.CSTextAnalytics_endpoint,
    new AzureKeyCredential(azureapi.CSTextAnalytics_key1)
  );

  const keyPhrasesInput = [input];
  const keyPhraseResult = await client.extractKeyPhrases(keyPhrasesInput);

  return keyPhraseResult[0].keyPhrases;
};
