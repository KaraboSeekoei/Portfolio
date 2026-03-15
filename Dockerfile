# Use a lightweight web server image
FROM nginx:alpine

# Copy your portfolio files into Nginx's default directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]