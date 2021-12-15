import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PeopleTest, Person } from "../Types/Person"

type Data = Person[]

export interface TableState {
  people: Data,
  workingCopy: Data,
  sortLowestToHighest: boolean
  sortKey: keyof Person
}

const initialState: TableState = {
  people: PeopleTest,
  workingCopy: PeopleTest,
  sortLowestToHighest: true,
  sortKey: "id",
}

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<keyof Person>) => {
      state.sortKey = action.payload
    },
    setSortLowestToHighest: (state, action: PayloadAction<boolean>) => {
      state.sortLowestToHighest = action.payload
    },
    flipLowestToHighest: (state) => {
      state.sortLowestToHighest = !state.sortLowestToHighest
    },

    mutateCopyProperty: (state, payload: PayloadAction<{ id: string, property: keyof Person, value: string }>) => {
      const copy = state.workingCopy.find(x => x.id == payload.payload.id)
      if (!copy) {
        throw new Error(`key doesn't exist: ${payload.payload.id}`)
      }
      const value = payload.payload.value
      // TODO: Ugly hack to get around immerjs not supporting dynamic property setting
      switch (payload.payload.property) {
        case "parentEmail":
          copy.parentEmail = value
          return
        case "parentName":
          copy.parentName = value
          return
        case "parentSurname":
          copy.parentSurname = value
          return
        case "applicantName":
          copy.applicantName = value
          return
        case "applicantSurname":
          copy.applicantSurname = value
          return
        case "phone":
          copy.phone = value
          return
        case "schoolName":
          copy.schoolName = value
          return
      }
    },
    merge: (state) => {
      state.people = state.workingCopy
    }
  }
})

// Action creators are generated for each case reducer function
export const { flipLowestToHighest, setSortLowestToHighest, setKey, mutateCopyProperty, merge } = tableSlice.actions

export default tableSlice.reducer
