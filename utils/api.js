// utils/api.js
export const handleResponse = async (response) => {
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "An error occurred");
	}
	return response.json();
};
