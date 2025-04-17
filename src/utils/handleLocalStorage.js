export const getUserCreditsStorage = (user) => {
    
    // firebase
    // const userStorageKey = `userCredits-${user.displayName}-${user.uid}`;


    const userStorageKey = `userCredits-${user.username}`;

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