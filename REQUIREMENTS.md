# TimesheetsRUs - Requirements Document

## 1. Overview

### 1.1. Project Goal
TimesheetsRUs is a web-based time tracking application designed to replace the current manual process of submitting and processing employee work hours via WhatsApp. The primary goal is to improve accuracy, reduce manual data entry, and provide clear, transparent reporting for both employees and payroll administrators.

### 1.2. Problem Statement
The current workflow relies on employees sending daily hours in a messaging app. A payroll clerk then manually transcribes this data into QuickBooks. This process is inefficient, prone to human error, and uses a confusing, non-standard method for calculating overtime. Reconciling hours at the end of each pay period is a time-consuming manual task for all parties.

### 1.3. Solution
TimesheetsRUs will provide a centralized platform where employees can log their time, and administrators can review, approve, and export data for payroll. The application will automate complex calculations (like overtime) and maintain a clear, auditable record of all time entries and modifications.

### 1.4. Device Usage and Design Considerations
The application must be designed with mobile-first and responsive principles to accommodate different user needs:

- **Employees:** Will primarily use mobile devices (smartphones/tablets) for all timesheet activities. The employee-facing screens must be optimized for mobile use with touch-friendly controls, large tap targets, and simplified layouts.
- **Administrators:** Will primarily use desktop/laptop computers for timesheet review and payroll processing. However, administrators may occasionally need to use mobile devices for quick checks and minor updates, so admin screens should be responsive and functional on mobile devices, though optimization for desktop use is the priority.

All screens should be fully responsive and functional across all device sizes, with particular attention to the mobile experience for employee screens and desktop experience for administrator screens.

## 2. User Roles

### 2.1. Employee

- Can log their daily work hours, descriptions, and status (travel, stat holiday).
- Can view and edit their own time entry history.
- Can view a real-time summary of their hours for the current pay period.
- Can see the processing status of their entries (e.g., "Entered").

### 2.2. Administrator (Payroll Clerk)

- Can view, review, and manage time entries for all employees.
- Can mark entries as "Entered" into the payroll system (QuickBooks).
- Is clearly notified of any employee modifications made to already-entered timesheets.
- Can generate and export summary reports for payroll processing.

## 3. Core Logic and Concepts

### 3.1. Pay Period Structure
The system operates on a semi-monthly pay period structure:

- **Pay Period 1:** 1st to 15th of each month
- **Pay Period 2:** 16th to the last day of each month

All time entry summaries, reports, and payroll processing are organized around these two pay periods. Each pay period summary displays:
- Total Regular Hours worked
- Total Overtime Hours
- Total Travel Hours
- Total Stat Hours

### 3.2. Time Entry Status Workflow
To ensure clear communication and prevent data loss, each time entry will have a status that tracks its lifecycle. This is the core of the administrative workflow.

- **State 1: Submitted**
    - This is the default state for any new time entry created by an employee.
    - It signifies that the entry is ready for the administrator to review.
- **State 2: Entered**
    - An administrator applies this status by clicking an "Enter" button after successfully transcribing the entry into QuickBooks.
    - This status is visible to the employee, serving as confirmation that their hours have been processed.
- **State 3: Updated**
    - If an employee edits an entry that is already in the Entered state, the system automatically changes its status to Updated.
    - This status acts as a prominent flag on the Admin Dashboard, alerting the clerk that a change has been made and requires their attention.
    - Once the administrator has processed the change in QuickBooks, they will click the "Enter" button again, and the status will revert to Entered.

### 3.3. Overtime Calculation
The system will automatically calculate overtime based on a standard 40-hour work week.

- Employees will always enter their actual hours worked for a given day.
- The application will sum the hours on a weekly basis. Any hours exceeding 40 within that week will be automatically categorized as "Overtime Hours" in the summary reports.
- This removes the confusing manual calculation (e.g., entering "43" for 42 hours worked) and ensures consistency.

### 3.4. Travel Time Calculation
Travel time is tracked separately from regular work hours.

- Travel is defined as any work-related travel that meets the minimum threshold of 50km.
- When travel occurs, the minimum travel time is 1 hour.
- If the actual travel takes longer (e.g., 4 hours), employees should enter the actual travel time.
- Travel hours are tracked and reported separately in pay period summaries.

### 3.5. Pay Period Selection UI Pattern
To maintain consistency across the application, all screens that display or filter by pay period use the same UI pattern:

- **Two dropdown selectors:**
  - Month selector (e.g., "October 2025", "September 2025")
  - Period selector (e.g., "16th - 31st", "1st - 15th")
- This pattern is used on:
  - Employee Pay Period Summary Screen
  - Employee Timesheet History Screen
  - Admin Dashboard / Pay Period Overview Screen
  - Admin Employee Timesheet Detail Screen (when applicable)
  - Admin Historical Reports Screen (may include additional date range options)

This consistent pattern makes the interface predictable and easy to use across both employee (mobile) and administrator (desktop) interfaces.

## 4. Screen-by-Screen Breakdown

### Navigation Flow

A complete navigation flow diagram is available in `navigation-flow.dot` (GraphViz format). All screens are now completed. Key navigation patterns:

**Employee Flow:**
- Login → Employee Home → Daily Entry, History, or Summary
- History/Summary can navigate to Daily Entry for editing
- All screens have access to Profile/Settings via header link

**Admin Flow:**
- Login → Admin Dashboard (landing page)
- Dashboard has prominent "Entries Queue" widget for bulk processing
- Dashboard → click employee → Employee Timesheet Detail
- Dashboard → Historical Reports
- All screens have access to Profile/Settings via header link

**Key Design Decisions:**
- **Admin Dashboard** focuses on CURRENT pay period with employee-by-employee view
- **Entries Queue** shows ALL pending entries across ALL periods for efficient bulk processing
- Queue widget on Dashboard provides direct access with summary stats (14 pending: 6 updated, 8 submitted)

### Screen Development Status

| Screen | Status | File |
|--------|--------|------|
| 4.1. Login Screen | ✅ Completed | login.html |
| 4.2. Daily Time Entry Screen (Employee) | ✅ Completed | daily-time-entry.html |
| 4.3. Employee Timesheet History Screen | ✅ Completed | employee-timesheet-history.html |
| 4.4. Employee Pay Period Summary Screen | ✅ Completed | employee-pay-period-summary.html |
| 4.5. Admin Dashboard / Pay Period Overview Screen | ✅ Completed | admin-dashboard.html |
| 4.6. Admin Employee Timesheet Detail Screen | ✅ Completed | admin-employee-timesheet-detail.html |
| 4.7. Admin Historical Reports Screen | ✅ Completed | admin-historical-reports.html |
| 4.8. Admin Entries Queue Screen | ✅ Completed | admin-entries-queue.html |
| 4.9. Employee Home/Dashboard Screen | ✅ Completed | employee-home.html |
| 4.10. Profile/Settings Screen | ✅ Completed | profile-settings.html |

### 4.1. Login Screen

- **Purpose:** Secure user authentication using OAuth social login providers.
- **Authentication Method:** OAuth 2.0 integration with major identity providers (Google, Facebook, Microsoft, Apple).
- **User Identification:** Users are tracked by their email address obtained from the OAuth provider.
- **Profile Information:**
  - First and last names are automatically imported from the OAuth provider during initial login.
  - Users can update their name in profile settings after authentication.
- **Components:**
  - TimesheetsRUs logo and branding
  - "Continue with Google" button
  - "Continue with Facebook" button
  - "Continue with Microsoft" button
  - "Continue with Apple" button
  - Information section explaining the authentication process
  - Links to Terms of Service and Privacy Policy

### 4.2. Daily Time Entry Screen (Employee)

- **Purpose:** To create or edit a single day's time entry.
- **Components:**
    - Date Picker (defaults to the current date).
    - Numeric Input for "Hours Worked".
    - Text Area for "Work Description".
    - Numeric Input for "Travel Hours" (optional, minimum 1 hour if travel occurred).
    - Checkbox: "Statutory Holiday".
    - "Save" button.

**Note:** Travel hours must be at least 1 hour when entered (representing the minimum 50km threshold). If no travel occurred, this field should be left empty or zero.

### 4.3. Employee Timesheet History Screen (Employee)

- **Purpose:** To view a list of all personal past entries and select one to edit.
- **Components:**
    - A list or table of past entries, filterable by pay period or date range.
    - Each row will display the Date, Hours, Description, and Status ("Submitted", "Entered", "Updated").
    - Clicking an entry will navigate to the Daily Time Entry Screen pre-filled with that entry's data for editing.

### 4.4. Employee Pay Period Summary Screen (Employee)

- **Purpose:** To provide the employee with a clear, real-time summary of their hours for the current pay period.
- **Components:**
    - Display of the current pay period dates (e.g., "Oct 1 - Oct 15, 2025").
    - Summary Cards/Totals for:
        - Regular Hours
        - Overtime Hours
        - Travel Hours
        - Stat Hours
    - A detailed list of all entries contributing to the summary.

### 4.5. Admin Dashboard / Pay Period Overview Screen (Administrator)

- **Purpose:** The main control panel for the clerk to see the status of all employees for the current pay period.
- **Components:**
    - A table or list of all employees.
    - Each employee row will show summary totals (Regular, OT, etc.) and a status indicator.
    - Crucially, this screen will highlight employees with entries in the Updated or Submitted state, likely sorting them to the top for priority attention.
    - Clicking an employee's name navigates to their detailed timesheet.

### 4.6. Admin Employee Timesheet Detail Screen (Administrator)

- **Purpose:** To review and process a single employee's timesheet for the pay period.
- **Components:**
    - A detailed list of all the employee's time entries for the period.
    - Each entry row will display all data and its current Status. "Updated" entries will be visually highlighted (e.g., with a colored background or icon).
    - Each row will have an "Enter" button for the clerk to press, which will cycle the status according to the workflow defined in section 3.1.
    - A "Mark All as Entered" button may be included for efficiency.

### 4.7. Admin Historical Reports Screen (Administrator)

- **Purpose:** To generate and export reports for payroll and record-keeping.
- **Components:**
    - Date range selectors to define the reporting period.
    - Filters to select one or all employees.
    - A "Generate Report" button that displays a summary table.
    - An "Export to CSV" button to download the data in a spreadsheet-friendly format for QuickBooks.

### 4.8. Admin Entries Queue Screen (Administrator)

- **Purpose:** To provide a centralized work queue for administrators to efficiently process all pending time entries requiring attention across all employees and all pay periods.
- **Key Design Decision:** Unlike other admin screens, this screen does NOT have pay period selectors. It shows ALL pending entries (Submitted and Updated) across all time periods, as it functions as a work queue rather than a filtered report view.
- **Key Benefits:**
    - Consolidated view of all Submitted and Updated entries from all employees across all pay periods
    - Prioritizes Updated entries (shown at top with orange highlighting) as they represent changes to already-entered data
    - Enables bulk processing with checkboxes and "Mark Selected as Entered" functionality
    - More efficient than navigating to individual employee detail screens
- **Components:**
    - Title and description emphasizing "all pending entries across all pay periods"
    - Summary statistics: Total Pending, Updated count, Submitted count, Number of employees
    - Attention banner highlighting urgent items
    - Filter buttons: All Pending, Updated Only, Submitted Only
    - Data table with columns:
        - Checkbox for bulk selection
        - Employee name
        - Date
        - Hours
        - Description
        - Tags (Travel, Stat Holiday)
        - Status badge (Submitted or Updated)
        - Individual "Enter" button
    - Bulk action button: "Mark Selected as Entered"
    - Updated entries have orange/beige background highlighting for visibility
    - Select All checkbox in table header

### 4.9. Employee Home/Dashboard Screen (Employee)

- **Purpose:** Landing page for employees after login; provides quick access to all employee functions and a summary of current timesheet status.
- **Key Design Decision:** Focuses on the primary action ("Add Today's Hours") with a prominent call-to-action button, while providing quick overview of current and previous pay periods for context.
- **Components:**
    - Header with welcome message showing employee name and profile link
    - Quick Action section:
        - Prominent purple gradient card with "Ready to log your hours?" heading
        - Large "Add Today's Hours" button for immediate time entry
    - Period summary cards:
        - Current Period card showing Oct 16 - Oct 31 with four stats (Regular, Overtime, Travel, Stat hours)
        - Previous Period card showing Oct 1 - Oct 15 with same four stats
    - Navigation section titled "Your Timesheet":
        - Time Entry button with 📝 icon - "Add or edit daily hours"
        - Timesheet History button with 📋 icon - "View and edit past entries"
        - Pay Period Summary button with 📊 icon - "View detailed hours breakdown"
    - All navigation buttons include icons, titles, descriptions, and arrow indicators
    - Mobile-optimized with touch-friendly controls and card-based layout

### 4.10. Profile/Settings Screen (Shared: Employee + Admin)

- **Purpose:** Allow users to manage their profile information and account settings. Shared by both employees and administrators.
- **Components:**
    - Header with "Profile & Settings" title and back navigation link
    - Profile section:
        - Large circular avatar displaying user initials on purple gradient background
        - User's full name displayed prominently
        - Email address shown below name
    - Information banner explaining OAuth security and email management
    - Personal Information section:
        - Email Address field (read-only, provided by OAuth identity provider)
        - First Name field (editable, pre-filled from OAuth)
        - Last Name field (editable, pre-filled from OAuth)
    - Appearance section:
        - Theme selector with two options in grid layout:
            - Light theme option with ☀️ icon and "Classic bright theme" description
            - Dark theme option with 🌙 icon and "Easy on the eyes" description
        - Visual preview cards that highlight when selected
    - Save Changes button (purple gradient, full width)
    - Danger Zone section:
        - Logout button (red border, full width)
        - Confirmation prompt before logout
    - JavaScript functionality:
        - Real-time avatar initial updates based on name changes
        - Theme selection tracking
        - Form validation and save confirmation

## 5. Change Log

### 2025-11-09
- **Travel Field Update:** Changed Travel from a simple checkbox to a numeric input field for Travel Hours. Travel must be at least 1 hour when entered (representing minimum 50km threshold), but can be more if actual travel time is longer. Travel hours increment by 1 hour (not 0.25 like regular hours).
- **Device Usage Requirements:** Added section 1.4 to document that employees will primarily (or exclusively) use mobile devices, while administrators will primarily use desktop/laptop computers but may occasionally need mobile access. All screens must be responsive, with employee screens optimized for mobile and admin screens optimized for desktop.
- **Pay Period Structure:** Added section 3.1 to clarify that the system operates on a semi-monthly pay period structure: 1st to 15th and 16th to last day of each month. All summaries show total regular hours, overtime hours, travel hours, and stat hours for each pay period.
- **Authentication Method:** Updated section 4.1 to use OAuth 2.0 social login (Google, Facebook, Microsoft, Apple) instead of traditional username/password authentication. Users are identified by email address, and first/last names are automatically imported from the OAuth provider but can be changed by users in their profile settings.
- **Pay Period Selection UI Pattern:** Added section 3.5 to document a consistent UI pattern for pay period selection across all screens. All screens now use two dropdown selectors (month + period) instead of various filter methods, ensuring a predictable and consistent user experience.
- **Admin Entries Queue Screen:** Added section 4.8 for a new administrative screen that provides a centralized work queue showing all pending entries (Submitted and Updated) from all employees across all pay periods. This allows administrators to efficiently process entries in bulk rather than navigating to individual employee detail screens. Updated entries are prioritized and highlighted for visibility. Uniquely, this screen does not include pay period selectors as it functions as a comprehensive work queue rather than a filtered view.
- **Entries Queue Widget on Admin Dashboard:** Added a prominent purple gradient widget to the Admin Dashboard showing Entries Queue statistics (Total Pending, Updated, Submitted) with a direct "Process Entries Queue" button. This clarifies the relationship between the Dashboard (current period, per-employee view) and the Entries Queue (all periods, all entries for bulk processing).
- **Navigation Flow Documentation:** Created comprehensive navigation flow diagram (navigation-flow.dot) showing all screen relationships and user journeys. Identified two missing screens: Employee Home/Dashboard (high priority landing page) and Profile/Settings (medium priority for name editing and logout).
- **Employee Home/Dashboard Screen (4.9):** Implemented the previously missing employee landing page (employee-home.html). Features include: welcome message with employee name, prominent "Add Today's Hours" quick action button, current and previous pay period summary cards showing all hour types, and navigation button cards to Time Entry, Timesheet History, and Pay Period Summary screens. Mobile-optimized with touch-friendly buttons and card-based layout.
- **Profile/Settings Screen (4.10):** Implemented the shared profile management screen for both employees and administrators (profile-settings.html). Features include: profile avatar with initials, read-only email display from OAuth provider, editable first/last name fields, Light/Dark theme selector with visual preview cards, Save Changes button, and Logout button in danger zone section. Theme selection uses radio buttons with emoji icons (☀️ for Light, 🌙 for Dark) for intuitive user experience.
- **Navigation Links:** Added profile/settings links to all existing screens (employee and admin) to complete the navigation architecture. All screens now include a consistent "⚙️ Profile" link in the header for easy access to profile management and logout functionality. Employee screens position the link in the top-right corner; admin screens integrate it alongside existing header elements while maintaining visual hierarchy.
