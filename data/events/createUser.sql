insert into [dbo].[Users]
(
    [email],
    [pass]
)
values (
    @email,
    @pass
)
SELECT SCOPE_IDENTITY() as userId