# RapidMiner recommendation workflow

This folder documents the RapidMiner element of ShopVerse. The live API uses the same category-preference input and returns the matching recommendation list, so the application remains usable while an exported RapidMiner model is refreshed.

## Build the process in RapidMiner Studio

1. Export an orders dataset with `userId`, `productId`, `category`, `quantity`, and `createdAt`.
2. Use **Read CSV** to load it, then **Select Attributes** to keep `userId`, `category`, and `quantity`.
3. Use **Aggregate** grouped by `userId` and `category`, with `sum(quantity)` to obtain each customer's preferred category scores.
4. Use **Sort** (descending `sum(quantity)`) followed by **Filter Example Range** to retain the top category/categories for each user. Optionally use **FP-Growth** plus **Create Association Rules** to find products frequently bought together.
5. Export the user's recommended category names. Send them to the storefront API as a comma-separated query parameter:

   ```text
   GET /api/analytics?categories=Electronics,Home
   ```

The endpoint first selects newest products from the RapidMiner-derived categories and fills any remaining recommendation slots with recent catalog products. This gives predictable recommendations even for new users with no purchase history.

## Evidence for assessment

Include a screenshot of the RapidMiner process canvas and its result table in your final submission. The API response includes `source: "RapidMiner-compatible category model"`, making the integration visible in browser network tools.
