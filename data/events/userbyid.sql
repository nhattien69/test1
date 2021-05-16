SELECT 

    [userId],
    email,
    pass,
    fristName,
    lastName,
    userAddress,
    cards

from [dbo].[Users]
where userId=@userId