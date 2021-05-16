
  select *
  from [dbo].[Admins]as a
  where a.adminUsername = @adminUsername and a.adminPass = @adminPass
