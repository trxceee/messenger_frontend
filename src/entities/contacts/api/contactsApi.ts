import { mainApi } from "@/shared";
import { ContactsType, CreatedContactType } from "../model";

export const contactsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyContacts: builder.query<ContactsType, void>({
      query: () => "/contacts/contacts",
      providesTags: ["contacts", "users"],
    }),
    addToContact: builder.mutation<CreatedContactType, {username: string, firstName?: string, lastName?: string}>({
      query: ({username, firstName, lastName}) => ({
        url: "/contacts/add",
        method: "POST",
        body: { username, firstName, lastName },
      }),
      invalidatesTags: ["contacts", "users", 'chats'],
    }),
    editContact: builder.mutation<boolean, {username: string, firstName?: string, lastName?: string}>({
      query: ({username, firstName, lastName}) => ({
        url: "/contacts/edit",
        method: "PATCH",
        body: { username, firstName, lastName },
      }),
      invalidatesTags: ["contacts", "users", 'chats'],
    }),
    deleteContact: builder.mutation<boolean, string>({
      query: (username) => ({
        url: "/contacts/contact",
        method: "DELETE",
        body: { username },
      }),
      invalidatesTags: ["contacts", "users", 'chats'],
    }),
  }),
  overrideExisting: true,
});
