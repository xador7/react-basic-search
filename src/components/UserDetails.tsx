import {ReactElement, FC} from 'react';

export interface IUserDetailsProps {}

const UserDetails: FC<IUserDetailsProps> = (props): ReactElement => {
    return(
        <div>
            <p>User Details</p>
        </div>
    );
};

export default UserDetails;
