export const leetcodeVerification = `#graphql
query getUserProfile($username: String!) {
    matchedUser(username: $username) {
        username
        profile {
            aboutMe
        }
    }
}`;
