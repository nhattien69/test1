select u.userId,u.email,u.pass,u.fristName,u.lastName,u.phone,u.userAddress,u.cards
  from [dbo].[Users] as u
  where u.email = @email and u.pass = @pass
