
const styles = {backgroundColor:"#ffffff44"}

const Chip = ({icon,content}) => {
    return (
        <div className='rounded-full flex items-center gap-3 px-4 py-2' style={styles}>
            <span className='w-4'>{icon}</span>
            <p>{ content}</p>
        </div>
    );
}

export default Chip;
