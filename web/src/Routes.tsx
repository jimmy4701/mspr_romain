// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={ScaffoldLayout} title="Diseases" titleTo="diseases" buttonLabel="New Disease" buttonTo="newDisease">
        <Route path="/diseases/new" page={DiseaseNewDiseasePage} name="newDisease" />
        <Route path="/diseases/{id:Int}/edit" page={DiseaseEditDiseasePage} name="editDisease" />
        <Route path="/diseases/{id:Int}" page={DiseaseDiseasePage} name="disease" />
        <Route path="/diseases" page={DiseaseDiseasesPage} name="diseases" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Sources" titleTo="sources" buttonLabel="New Source" buttonTo="newSource">
        <Route path="/sources/new" page={SourceNewSourcePage} name="newSource" />
        <Route path="/sources/{id:Int}/edit" page={SourceEditSourcePage} name="editSource" />
        <Route path="/sources/{id:Int}" page={SourceSourcePage} name="source" />
        <Route path="/sources" page={SourceSourcesPage} name="sources" />
      </Set>
      <Set wrap={ScaffoldLayout} title="PandemicStats" titleTo="pandemicStats" buttonLabel="New PandemicStat" buttonTo="newPandemicStat">
        <Route path="/pandemic-stats/new" page={PandemicStatNewPandemicStatPage} name="newPandemicStat" />
        <Route path="/pandemic-stats/{id:Int}/edit" page={PandemicStatEditPandemicStatPage} name="editPandemicStat" />
        <Route path="/pandemic-stats/{id:Int}" page={PandemicStatPandemicStatPage} name="pandemicStat" />
        <Route path="/pandemic-stats" page={PandemicStatPandemicStatsPage} name="pandemicStats" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Locations" titleTo="locations" buttonLabel="New Location" buttonTo="newLocation">
        <Route path="/locations/new" page={LocationNewLocationPage} name="newLocation" />
        <Route path="/locations/{id:Int}/edit" page={LocationEditLocationPage} name="editLocation" />
        <Route path="/locations/{id:Int}" page={LocationLocationPage} name="location" />
        <Route path="/locations" page={LocationLocationsPage} name="locations" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
