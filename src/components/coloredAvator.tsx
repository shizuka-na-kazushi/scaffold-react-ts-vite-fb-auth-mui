
import { Avatar, Tooltip } from '@mui/material'

function stringToHslColor(str: string, s: number, l: number, a?: number): string {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    if (!a) {
        return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    } else {
        return 'hsl(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';
    }
}

export function stringToColor3(text: string, alpha?: number): string {
    const saturation = 80;
    const lightness = 40;
    return stringToHslColor(text, saturation, lightness, alpha)
}


type ColoredAvatarProp = {
    name: string | null,
    email: string | null,
    disableTooltip?: boolean
}

const ColoredAvatar = ({ name, email, disableTooltip }: ColoredAvatarProp) => {
    return (
        <Tooltip title={(name && !disableTooltip) ? name : undefined} placement='left'>
            <Avatar alt={name ? name : ""} sx={{ backgroundColor: email ? stringToColor3(email) : undefined }} src='/#' >{name ? name.at(0) : ''} </Avatar>
        </Tooltip>
    )
}

export default ColoredAvatar;

