export const getUserCreditsStorage = (user) => {
    
    const userStorageKey = `userCredits-${user.displayName}-${user.uid}`;

    const storedCredits = localStorage.getItem(userStorageKey);
    
    const parsedCredits = parseInt(storedCredits, 10)

    return {
      userStorageKey,
      storedCredits: parsedCredits
    };
}


export const setUserCreditsStorage = (userStorageKey, credits) => {
    if (userStorageKey && typeof credits === 'number') {
        localStorage.setItem(userStorageKey, credits.toString());
    }
}