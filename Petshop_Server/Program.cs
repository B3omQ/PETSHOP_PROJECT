using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Petshop_Server.MiddleWare;
using Petshop_Server.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<PetShopContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyCnn")));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
builder.Services.Scan(scan => scan
    .FromAssemblyOf<Program>()
    .AddClasses(classes => classes.Where(t => t.Name.EndsWith("Service")))
        .AsImplementedInterfaces()
        .WithScopedLifetime()
    .AddClasses(classes => classes.Where(t => t.Name.EndsWith("Repository")))
        .AsImplementedInterfaces()
        .WithScopedLifetime()
);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero, // Mặc định là 5 phút, set về 0 để chặn ngay lập tức
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
        )
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var token = context.Request.Cookies["accessToken"];

            if (!string.IsNullOrEmpty(token))
            {
                context.Token = token;
            }
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddMemoryCache(); 

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("AllowReact");

app.UseAuthentication();

app.UseMiddleware<JwtBlacklistMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
