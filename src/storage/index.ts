const getLocalData = (key: string): string | undefined => {
    return localStorage.getItem(key) || undefined
}

const setLocalData = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

export {
    getLocalData,
    setLocalData
}