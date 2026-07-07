
const getLogs = async () => {
    const response = await api.get('/users/logs');
    return response.data;
};
const logService = { getLogs };
export default logService;