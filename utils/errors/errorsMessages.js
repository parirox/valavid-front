const form_errors = {
    example: {
        required: 'example is required!',
    },
}

const general_errors = {
    datatable_no_result: "something has wrong!",
    FETCH_ERROR: "network error!",
}

export function getErrorMessage(error_data) {
    const all_error_message = {...form_errors, ...general_errors}

    if (typeof error_data === "object") {
        const {error, status} = error_data
        if (all_error_message[status] !== undefined) return all_error_message[status]
        error_data = error;
    }
    if (all_error_message[error_data] !== undefined) return all_error_message[error_data]
    return error_data
}