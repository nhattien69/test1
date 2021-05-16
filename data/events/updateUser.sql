update [dbo].[Users]
set [email]=@email,
    [pass]=@pass,
    [fristName]=@fristName,
    [lastName]=@lastName,
    [userAddress]=@userAddress,
    [cards]=@cards
where [userId]=@userId


SELECT [email],[pass],[fristName],lastName,userAddress,cards
from [dbo].[Users]
where [userId]=@userId