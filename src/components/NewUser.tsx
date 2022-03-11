import { ReactElement, FC } from "react";

export interface INewUserProps {}

const NewUser: FC<INewUserProps> = (props): ReactElement => {
    return(
        <div>
            <p>Add new User</p>
        </div>
    );
};

export default NewUser;
