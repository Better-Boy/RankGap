## RankGap - Amazon SEO & Rank Analyzer


Selling on Amazon is one thing; being **discovered** is another. RankGap is a **multi-agent AI system** designed to uncover **Amazon ranking blind spots** for your products using real-time data. It identifies where your product ranks, which search queries you’re missing, and how to optimize for better visibility.

Unlike generic reports, RankGap delivers actionable **Amazon SEO insights** by combining intelligent **search keyword/query generation, ranking analysis, and gap detection**.


## Demo

The video demo can be found [here](https://www.youtube.com/watch?v=ohMNU2IG2ok)

Live App - [RankGap](https://rank-gap.vercel.app/)

## n8n Workflow

The backend of the app is powered by n8n workflows.

There are 3 workflows involved: 
1. Main Workflow
2. Download Product Data from Amazon
3. Analysis of the scraped product data

Main Workflow:

The main workflow is the entry point of the entire pipeline. It executes the following steps:

1. The pipeline is triggered via a webhook (a POST request) with the following payload:
```json
{
    "url": "https://www.amazon.com/dp/B07QTVRF3J", -- amazon product url
    "queryCount": 3, -- number of search queries to generate
    "execution_id": <uuid> -- identifying workflow end result from supabase
}
```

2. The given Amazon product is scraped using the Download Product Data from Amazon workflow, returning the full attribute list from Bright Data.

3. A Search Query Generator agent produces multiple relevant search queries (see AI agents table below for prompts and details).

4. Search results for each query are scraped using Bright Data Unlocker. The Amazon search URL pattern is:
https://www.amazon.com/s?k=<encoded_query>

5. The HTML returned is parsed, and the top 20 product ASINs are extracted.

6. The Download Product Data from Amazon workflow scrapes detailed info for these top 20 products.

7. Data transformations are applied to retain only relevant attributes.

8. Both the target product and competitors are sent to the Analysis of the Scraped Product Data workflow.

9. The final analysis is stored in a Supabase database, linked via the execution_id passed at trigger time.

![Main Workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tfcvkvn65dgrdf643m1l.png)

Total number of n8n nodes in this workflow - 19

The json file of the Main workflow can be found [here](https://github.com/Better-Boy/RankGap/blob/main/workflows/RankGap.json)

Download Product Data from Amazon Workflow:

This workflow’s sole job is to scrape Amazon product data using the Bright Data web scraper. Steps:

- Input is a list of product URLs in the following format:
```json
[
    {
        "url": "https://www.amazon.com/dp/B07DSVRF2J"
    },
    {
        "url": "https://www.amazon.com/dp/B07ABCDF2J"
    }
]
```
- Bright Data Verified Node triggers a collection using the Trigger Collection By URL operation, returning a snapshot ID.
- Using Monitor Snapshot and an n8n Loop node, the workflow waits until the snapshot is ready.
- Once complete, the Download Snapshot operation retrieves product data.

![Download Product Data from Amazon](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qc878wvwgfyjq4qc9t5n.png)

Total number of n8n nodes - 8

The json file of the Main workflow can be found [here](https://github.com/Better-Boy/RankGap/blob/main/workflows/Download%20Amazon%20Products.json)

Analysis of the scraped product data Workflow:

This workflow performs structured analysis on the target product and its competitors:

- Input: Target product JSON + search results JSON.
- Sent to the **Visibility & Presence Analysis Agent** for ranking visibility.
- Sent to the **Competitor & Attribute Gap Analysis Agent** for feature/attribute gaps.
- Sent to the **Final Recommendations & Action Plan Agent** for actionable next steps.

![Analysis](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iwdbqsdhhxd48ih0yimw.png)

Total number of n8n nodes in this workflow - 18

The json file of the Main workflow can be found [here](https://github.com/Better-Boy/RankGap/blob/main/workflows/RankGap%20Analysis.json)

Combined total nodes - 19 + 18 + 8 = 45

## Frontend

Refer [Frontend README](./frontend/README.md)

