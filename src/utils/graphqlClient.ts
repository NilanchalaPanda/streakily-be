import axios from "axios";
import { LEETCODE_BASE_URL } from "../secrets";

const LEETCODE_GRAPHQL_ENDPOINT = LEETCODE_BASE_URL;

/**
 * Executes a GraphQL query with variables.
 *
 * @param query - The GraphQL query string.
 * @param variables - Variables for the query.
 * @returns The response data from the GraphQL API.
 */

export const executeGraphQLQuery = async (
  query: string,
  variables: Record<string, any>
) => {
  try {
    const response = await axios.post(
      LEETCODE_GRAPHQL_ENDPOINT!,
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data?.data;
  } catch (error) {
    console.error("GraphQL Query Error:", error);
    throw new Error("Failed to fetch data from LeetCode API.");
  }
};
