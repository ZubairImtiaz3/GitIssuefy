export const collections = [
    {
        name: 'Users',
        attributes: [
            { name: 'github_access_token', type: 'string', size: 255, required: true },
            { name: 'email', type: 'email', required: true },
            { name: 'username', type: 'string', size: 255, required: false },
            { name: 'github_token_expiry', type: 'datetime', required: true },
            { name: 'discord_id', type: 'string', size: 255, required: false }
        ]
    },
    {
        name: 'Notifications',
        attributes: [
            { name: 'user_id', type: 'string', size: 255, required: true },
            { name: 'issue_title', type: 'string', size: 255, required: true },
            { name: 'issue_link', type: 'string', size: 255, required: true },
            { name: 'issue_description', type: 'string', size: 255, required: true },
            { name: 'status', type: 'string', size: 255, required: true },
            { name: 'watched_repo', type: 'string', size: 255, required: true },
            { name: 'issue_number', type: 'string', size: 255, required: true },
            { name: 'discord_id', type: 'string', size: 255, required: true }
        ]
    },
    {
        name: 'WatchedRepositories',
        attributes: [
            { name: 'user_id', type: 'string', size: 255, required: true },
            { name: 'watched_repo', type: 'string', size: 255, required: true },
            { name: 'last_checked', type: 'datetime', required: false },
            { name: 'status', type: 'string', size: 255, required: false },
            { name: 'labels', type: 'string', size: 255, required: false, array: true }
        ]
    }
];
