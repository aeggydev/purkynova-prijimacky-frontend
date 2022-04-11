import { Icon } from "@chakra-ui/react"

export const Normal = <Icon width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2ZM18 2L10 7L2 2H18ZM18 14H2V4L10 9L18 4V14Z"
        fill="white" />
</Icon>
export const Unpaid = Normal

export const UnpaidLate = <Icon width="21" height="18" viewBox="0 0 21 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
    <path
        d="M17.99 11.04V2C17.99 0.9 17.09 0 15.99 0H2C0.9 0 0 0.9 0 2V12C0 13.1 0.9 14 2 14H12.05C12.33 15.92 14.15 17.35 16.23 16.93C17.57 16.66 18.66 15.56 18.93 14.22C19.18 12.98 18.77 11.83 17.99 11.04ZM15.99 2L9 5.5L2 2H15.99ZM12.35 12H2V4L9 7.5L16 4V10.05C15.84 10.03 15.67 10 15.5 10C14.11 10 12.91 10.82 12.35 12ZM17.5 14H13.5V13H17.5V14Z"
        fill="white" />
</Icon>

export const Canceled = <Icon width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M17.99 11.04V2C17.99 0.9 17.09 0 15.99 0H2C0.9 0 0 0.9 0 2V12C0 13.1 0.9 14 2 14H12.05C12.33 15.92 14.15 17.35 16.23 16.93C17.57 16.66 18.66 15.56 18.93 14.22C19.18 12.98 18.77 11.83 17.99 11.04ZM15.99 2L9 5.5L2 2H15.99ZM12.35 12H2V4L9 7.5L16 4V10.05C15.84 10.03 15.67 10 15.5 10C14.11 10 12.91 10.82 12.35 12ZM17.5 14H13.5V13H17.5V14Z"
        fill="white" />
</Icon>

export const Paid = <Icon width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H10V14H2V4L10 9L18 4V9H20V2C20 0.9 19.1 0 18 0ZM10 7L2 2H18L10 7ZM15.34 18L11.8 14.46L13.21 13.05L15.33 15.17L19.57 10.93L21 12.34L15.34 18Z"
        fill="white" />
</Icon>

export const Confirmed = Paid
