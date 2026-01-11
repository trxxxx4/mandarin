export const Base64ImageView = ({ base64String, className }) => {
        return (
            <img
                src={`data:image/jpeg;base64,${base64String}`}
                className={className}
            />
        )
    }


export function isNotEmpty(element) {
    return (element && element.trim() !== "")
}