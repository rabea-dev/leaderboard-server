import {generateUniqueString} from "../string.utils";
import {Theme, ThemeDto} from "../models/theme";

export class ThemeService {
    async selectTheme(themeDto: ThemeDto) {
        const theme: Theme = {
            id: generateUniqueString(),
            ...themeDto
        };
        return {
            message: 'Theme created successfully',
            theme
        }
    }
}
