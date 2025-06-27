export const notificationTemplate = {
    // Follow notification
    follow: (fromUser, toUserId) => ({
        type: 'follow',
        from: fromUser.id,
        to: toUserId,
        message: `${fromUser.firstName} ${fromUser.lastName} has followed you.`,
        data: null,
    }),
};