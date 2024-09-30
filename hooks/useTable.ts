import {AxiosInstance} from "@/utils/AxiosInstance";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

async function fetchTableData(url: string) {
    if (url.endsWith(".json")) {
        const response = await fetch(url);
        return response.json();
    }
    const response = await AxiosInstance.get(url);
    return response.data.data; // Assuming data is under the `data` key
}

async function createRow(url: string, newRow: any) {
    console.log("To be added row is: ", newRow);
    console.log("The url is: ", url);
    // TODO: Need to pass things without id?

    const response = await AxiosInstance.post(url, newRow);
    return response.data;
}

async function updateRow(url: string, updatedRow: any) {
    const response = await AxiosInstance.put(url, updatedRow);
    return response.data;
}

/* idofRow should be of:
{
    primary_key: value
}
 */
async function deleteRow(url: string, row: any) {
    console.log("The row to be deleted in useTable: ", row);
    const response = await AxiosInstance.delete(url, {
        data: row
    });
    return response.data;
}

// Custom hook to manage CRUD operations for a table
export function useTable<T>(url: string) {
    const queryClient = useQueryClient();

    // Fetch data
    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: [url], queryFn: () => fetchTableData(url)
    });

    // Create row mutation
    const createMutation = useMutation(
        {
            mutationFn: (newRow: T) => createRow(url, newRow),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [url]}); // Invalidate query
            }
        });


    const updateMutation = useMutation({
        mutationFn: ({updatedRow}: {
            updatedRow: T
        }) => updateRow(url, updatedRow),
    })


    const deleteMutation = useMutation({
        mutationFn: (row: T) => deleteRow(url, row),
    })

    return {
        data,
        isLoading,
        isError,
        createMutation,
        updateMutation,
        deleteMutation,
    };
}